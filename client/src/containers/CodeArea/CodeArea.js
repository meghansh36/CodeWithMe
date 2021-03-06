import React, {Component} from "react"
import {Controlled as CodeMirror} from 'react-codemirror2'
import ModeSelector from "../../components/CodeAreaComponents/ModeSelector"
import CodeOutput from "./CodeOutput"
import FileUpload from "../../components/CodeAreaComponents/FileUpload"
// import Aux from "../../hoc/aux"
import socketIOClient from "socket.io-client"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/ambiance.css"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/clike/clike"
import "codemirror/mode/python/python"
import "codemirror/mode/ruby/ruby"
import classes from "./CodeArea.css"

class CodeArea extends Component{
    //INITIAL STATE
    state = {
        code: "#include <stdio.h>\nint main(void){\n\tprintf(\"Hello World\");\n}",
        mode: 'text/x-csrc',
        language: "C",
        theme: 'ambiance',
        roomId: this.props.roomId,
        editing:false,

    }

    socketEndpoint='http://localhost:5000'

    socket = socketIOClient(this.socketEndpoint) //CONNECTS SOCKET 

    beforeCodeUpdateHandler = (editor,data,value) => {  //BEFORE CHANGE HANDLER FOR CODEMIRROR
        this.setState({code: value})
    }

    keyPressHandler = () => {  //SETS EDITING TO TRUE. IMPORTANT! SOLVES THE TYPE GLITCH
        this.setState({
            editing: true
        })
    }

    codeUpdateHandler = (editor,data,newCode) => { //ONCHANGE HANDLER FOR CODEMIRROR. 
        console.log(this.state.editing)
        if(this.state.editing){ //SOLVES TYPE GLITCH
            //console.log("socket emitted")
            //emit socket for code update
            this.socket.emit("code_updated", {code: this.state.code, roomId: this.state.roomId}) 
        }
    }

    modeSelectHandler = (lang,mode,defaultCode) => {  //HANDLER FOR MODE SELECT DROPDOWN
        this.setState({
            mode: mode,
            language: lang,
            code: defaultCode.length > this.state.code.length ? defaultCode : this.state.code
        })
    }

    fileUploadHandler = (event) => {
        let file = event.target.files[0];
        console.log(file);
        
        if (file) {
          let data = new FileReader();
          data.onload = (e)=>{
              this.setState({
                  code: e.target.result,
                  editing:true
              })
          }
          data.readAsText(file)
         // data.append('file', file);
          // axios.post('/files', data)..
          
        }
    }

    //LIFECYCLE METHODS AND THEIR HELPER FUNCTIONS ARE DEFINED BELOW

    componentWillMount(){
        this.socket.emit("create_room", this.state.roomId)
        //console.log(this.state.code)
    }

    componentDidMount(){  // HOOK FOR LIFECYCLE. LISTENS FOR INCOMING SOCKETS
            this.socket.on("process code", (response) => {
                this.updateCodeFromSockets(response.data.code)
                //console.log("socket received")  
            })
        
    }
    updateCodeFromSockets = (payload) => {  
        //SETS NEW STATE. CHANGES EDITING TO FALSE. IMPORTANT! 
        //SOLVES TYPE GLITCH
             
            this.setState({
                code: payload,
                editing: false
            })
        
    }

    render(){ //RENDER METHOD
        var options = { //OPTIONS FOR CODEMIRROR
            lineNumbers: true,
            mode: this.state.mode,
            theme: this.state.theme
        }
        // console.log(this.state.code)
        return (
        <div>
            <div className={classes.CodeArea}>

                <CodeMirror value = {this.state.code} options = {options} onChange = {this.codeUpdateHandler} onBeforeChange = {this.beforeCodeUpdateHandler} onKeyPress={this.keyPressHandler} onKeyDown={this.keyPressHandler} className = {classes.CodeEditor}/>

            </div>
            <ModeSelector change = {this.modeSelectHandler}></ModeSelector>
            <FileUpload uploadFile = {this.fileUploadHandler}/>
            <CodeOutput language={this.state.language} code = {this.state.code}></CodeOutput>
        </div>    
   
    );
    }
}

export default CodeArea