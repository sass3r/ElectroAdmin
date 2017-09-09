require 'creek'
require 'firebase'

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
        return "{\"codsys\": \"#{@codsys}\", \"name\": \"#{@name}\", \"carrer\": \"#{@carrer}\", \"status\": false}"
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
    name = sheet.rows.first['A1']    
    name = name.split('.').last
    return name
end

def getStudents(sheet)
    students = []
    index = 4
    rows = sheet.rows.map{|x| x}    
    for i in 3..rows.size-1
        student = getStudent(rows[i], index)
        index+=1
        students << student
    end
    return students
end

def getStudent(row,i)
    student = Student.new
    student.codsys = row['A'+i.to_s]
    student.name = row['B'+i.to_s]
    student.carrer = row['C'+i.to_s]
    return student
end

def getGroup(sheet)
    sheetGroup = sheet.rows.to_a
    group = Group.new
    group.docentName = sheetGroup[2]['B3']
    group.number = sheetGroup[3]['B4']
    group.schedule = sheetGroup[4]['B5']
    return group
end

def getMatter(creek)
    matter = Matter.new
    sheet = creek.sheets[0]
    matter.name = getMatterName(sheet)
    matter.students = getStudents(sheet)
    matter.groups = []
    for i in 1..creek.sheets.size 
        sheet = creek.sheets[i]
        if creek.sheets[i].nil? == false
            matter.groups << getGroup(sheet)
        end
    end
    return matter
end

excel = ARGV[0];
name = 'ROBOTICA.xlsx'
creek = Creek::Book.new excel
matter = getMatter(creek)
json = JSON.parse(matter.tojson)
#File.write('circuito.json', json)

#firebase conection and publish
base_uri = 'https://electroinscripciones.firebaseio.com/'
firebase = Firebase::Client.new(base_uri)
response = firebase.push('laboratorios/', json)
json = {key: response.body['name'] , name: matter.name}
puts response.body['name']
response = firebase.push('materias/', json)

