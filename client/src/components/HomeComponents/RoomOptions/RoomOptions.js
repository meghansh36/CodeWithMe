import React from "react" 
import Aux from "../../../hoc/aux"

const roomOptions = (props) => {

    return (
    <Aux>    
        <div>
            New Room:
            <button onClick={props.newRoomClicked}>Get Room Id</button>
            {/* <Link to='/new_room'>new room</Link> */}
        </div>
        <div>
            <form>
                <input type="text"/>
                <a href="/existing">Enter Room</a>
            </form>
        </div>
    </Aux>    
    );

} 


export default roomOptions