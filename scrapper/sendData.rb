require 'creek'
require 'rest-firebase'

class Matter
    def new(name, students)
        @name = name
        @student = students
        @groups = []        
    end

    def tojson
        return "{ \"name\": \"#{@name}\", 
        \"students\": #{studentstojson},
        \"groups\": #{groupstojson} }"
    end

    def studentstojson
        json = "["
        @students.each do |student|
            json+= student.tojson + ","
        end
        json = json.slice(0, json.size-1)
        json += "]"
        return json
    end
    
    def groupstojson
        json = "["
        @groups.each do |group|
            json+= group.tojson + ","
        end
        json = json.slice(0, json.size-1)
        json += "]"
        return json
    end

    attr_accessor :name, :students, :groups
end

class Student
    def new(codsys, name, carrer)
        @codsys = codsys
        @name = name
        @carrer = carrer
    end

    def tojson
        return "{\"codsys\": \"#{@codsys}\", \"name\": \"#{@name}\", \"carrer\": \"#{@carrer}\"}"
    end
    attr_accessor :codsys, :name, :carrer
end

class Group
    def new(docentName, number, schedule)
        @docentName = docentName
        @number = number
        @schedule = schedule
    end

    def tojson
        return "{\"docentName\": \"#{@docentName}\", \"number\": \"#{@number}\", \"schedule\": \"#{@schedule}\"}"
    end
    attr_accessor :docentName, :number, :schedule
end

def getMatterName(sheet)
    name = sheet.rows.first['C3']
    return name
end

def getStudents(sheet)
    students = []
    i = 3
    sheet.rows.each do |row|
        student = getStudent(row, i)
        i+=1
        students << student
    end
    return students
end

def getStudent(row,i)
    student = Student.new
    student.codsys = row['B'+i.to_s]
    student.name = row['C'+i.to_s]
    student.carrer = row['D'+i.to_s]
    return student
end

def getGroup(sheet)
    sheetGroup = sheet.rows.to_a
    group = Group.new
    group.docentName = sheetGroup[3]['C4']
    group.number = sheetGroup[4]['C5']
    group.schedule = sheetGroup[5]['C6']
    return group
end

def getMatter(creek)
    matter = Matter.new
    sheet = creek.sheets[0]
    matter.name = getMatterName(sheet)
    sheet = creek.sheets[1]
    matter.students = getStudents(sheet)
    matter.groups = []
    for i in 2..creek.sheets.size
        sheet = creek.sheets[i]
        if creek.sheets[i].nil? == false
            if creek.sheets[i].name.include? "Grp"
                matter.groups << getGroup(sheet)
            end
        end
    end
    return matter
end

creek = Creek::Book.new 'CIRCUITOS2.xlsm'
matter = getMatter(creek)
json = JSON.parse(matter.tojson)
File.write('circuito.json', json)

#firebase conection and publish
# base_uri = 'https://electroinscripciones.firebaseio.com/'
# firebase = Firebase::Client.new(base_uri)
# response = firebase.push("materias", json)

f = RestFirebase.new :site => 'https://electroinscripciones.firebaseio.com/',
    :secret => 'secret',
    :d => {:auth_data => 'something'},
    :log_method => method(:puts),
    # `timeout` in seconds
    :timeout => 10,
    # `max_retries` upon failures. Default is: `0`
    :max_retries => 3,
    # `retry_exceptions` for which exceptions should retry
    # Default is: `[IOError, SystemCallError]`
    :retry_exceptions =>
    [IOError, SystemCallError, Timeout::Error],
    # `error_callback` would get called each time there's
    # an exception. Useful for monitoring and logging.
    :error_callback => method(:p),
    # `auth_ttl` describes when we should refresh the auth
    # token. Set it to `false` to disable auto-refreshing.
    # The default is 23 hours.
    :auth_ttl => 82800,
    # `auth` is the auth token from Firebase. Leave it alone
    # to auto-generate. Set it to `false` to disable it.
    :auth => false # Ignore auth for this example!

# Streaming over 'users/tom'
es = f.event_source('materias/')
es.onopen   { |sock| p sock } # Called when connected
es.onmessage{ |event, data, sock| p event, data } # Called for each message
es.onerror  { |error, sock| p error } # Called whenever there's an error
# Extra: If we return true in onreconnect callback, it would automatically
#        reconnect the node for us if disconnected.
es.onreconnect{ |error, sock| p error; @reconnect }

# Start making the request
es.start

# Try to close the connection and see it reconnects automatically
es.close

p f.post('materias/', json)