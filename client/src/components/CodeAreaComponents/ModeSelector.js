import React from "react" 


const modeSelector = (props) => {

    const lang_obj = {
        'C': {
            'mode': 'text/x-csrc',
            'value': "#include <stdio.h>\nint main(void){\n\tprintf(\"Hello World\");\n}"
        },
        'C++': {
            'mode': 'text/x-c++src',
            'value': "#include<iostream>\nusing namespace std;\nint main(){\n\tcout<<\"Hello World\";\n\treturn 0;\n}"
        },
        'Java': {
            'mode': 'text/x-java',
            'value': "class HelloWorldApp {\n" +
                    "    public static void main(String[] args) {\n" +
                    "        System.out.println(\"Hello World\");\n" +
                    "    }\n" +
                    "}"
        },
        'C#': {
            'mode': 'text/x-objectivec',
            'value': "using System;\n" +
                     "\n" +
                     "class Program\n" +
                     "{\n" +
                     "    static void Main(string[] args)\n" +
                     "    {\n" +
                     "        Console.WriteLine(\"Hello World\");\n" +
                     "    }\n" +
                     "}"
        },
        'Python3': {
            'mode': {
                name: 'python',
                version: 3,
                singleLineStringErrors: false
            },
            'value': "print('Hello World')"
        },
        'Python2': {
            'mode': {
                name: 'python',
                version: 2,
                singleLineStringErrors: false
            },
            'value': "print 'Hello World' "
        },
        'Javascript': {
            'mode': 'javascript',
            'value': "console.log(\"Hello World\");"
        },
        'Ruby': {
            'mode': 'text/x-ruby',
            'value': 'puts "Hello World"'
        }
    };

    return(
        <select name="modes" onChange = {(e) => props.change(e.target.value,lang_obj[e.target.value].mode,lang_obj[e.target.value].value)}>
            <option value="C" defaultValue>C</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="Javascript" >Javascript</option>
            <option value="C#">C#</option>
            <option value="Ruby">Ruby</option>
            <option value="Python3">Python 3</option>
            <option value="Python2">Python 2</option>
        </select>
    );

} 


export default modeSelector