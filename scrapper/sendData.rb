require 'creek'

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
json = matter.tojson
File.write('circuito.json', json)