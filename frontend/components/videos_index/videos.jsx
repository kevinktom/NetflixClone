import React from 'react';
import { Link } from 'react-router-dom';
import {logout} from '../../actions/session_actions';
// import Nav from '../navbar/navbar';
import NavBarContainer from '../navbar/navbar_container';
import VideoContainer from '../video/video_container';


// export const Videos = (props) => {
//   return (
//     <div>
//       <h1>Welcome to the best version of Netflix</h1>
//       <button onClick={props.logoutCurrentUser}>Logout</button>
//     </div>
//   )
// }

class Videos extends React.Component{
  constructor(props){
    super(props);
    this.state = { muted: false, indexlist: false, listchange: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]};
    this.handleHoverPlay = this.handleHoverPlay.bind(this);
    this.handleHoverLeave = this.handleHoverLeave.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.handleMyList = this.handleMyList.bind(this);
    this.handleVideoList = this.handleVideoList.bind(this);
  }

  handleHoverPlay(e){
    let vid = document.getElementById("mainvid");
    let video = e.currentTarget.children[0];
    video.nextSibling.classList.remove("hiddenIcons");
    // debugger
    e.persist();
    video.play().then(null, () => {
      video.muted = true
      video.play();
    });
    this.setState({ muted: true });
    vid.muted = true;
  }
  // handleHoverPlay(e){
  //   let vid = document.getElementById("mainvid");
  //   e.persist();
  //   e.target.play().then(null, () => {
  //     e.target.muted = true
  //     e.target.play();
  //   });
  //   this.setState({ muted: true });
  //   vid.muted = true;
  // }


  handleHoverLeave(e){
    let video = e.currentTarget.children[0];
    // debugger
    video.pause();
    video.currentTime = 0;
    video.load();
    video.nextSibling.classList.add("hiddenIcons");
  }

  // handleHoverLeave(e){
  //   e.currentTarget.pause();
  //   e.currentTarget.currentTime = 0;
  //   e.currentTarget.load();
  // }


  handleMute(){
    // debugger
    let vid = document.getElementById("mainvid")
    if (this.state.muted){
      this.setState({muted: false});
    }
    else{
      this.setState({muted: true});
      vid.muted = true;
    }
  }

  handleMyList(){
    // let listbutton = document.getElementById("addlistbutton")
    // debugger
    if (this.state.indexlist) {
      this.props.deleteMyList(this.props.videos[0].id).then(this.props.fetchLists);
      this.setState({ indexlist: false });
    }
    else {
      this.props.createMyList(this.props.videos[0].id).then(this.props.fetchLists);
      this.setState({ indexlist: true });
    }
  }

  handleVideoList(video){
    // debugger
    let tempState = this.state.listchange.slice();
    if (this.state.listchange[video.props.index]){
      this.props.deleteMyList(video.props.video.id).then(this.props.fetchLists);
      tempState[video.props.index] = false;
      this.setState({listchange: tempState}); //The state isnt changing for some reason

    }
    else{
      debugger
      this.props.createMyList(video.props.video.id).then(this.props.fetchLists);
      tempState[video.props.index] = true;
      this.setState({ listchange: tempState });
    }
  }
  
  componentDidMount(){
    // const allProps = this.props;
    this.props.renderVideos();
    // debugger
    this.props.fetchLists();
    // debugger

  }

  render(){
    // debugger
    // let listbutton = <div></div>
    if (this.props.mylists.length > 0 && this.props.videos.length > 0){
    this.props.mylists.forEach(list => {
      if (list.video_id === this.props.videos[0].id) {
        this.state.indexlist = true;
      }
      else{
        this.state.indexlist = false;
      }
    })
  }
  
  const IndividualVideos = this.props.videos.map((video, idx) => {
    // let indexList = false;
    this.props.mylists.forEach(list => {
      if (list.video_id === video.id){
        // indexList = true;
        this.state.listchange[idx] = true;
      }
      else{
        this.state.listchange[idx] = false;
      }
    })
    return (<VideoContainer video={video} handleHoverPlay={this.handleHoverPlay} index={idx}/>)
  })
  // debugger
  
    return (

    <div className='indexGrid'>
      <NavBarContainer />
      {IndividualVideos.length >= 2 ? 
        <div className="mainVideoDiv">
            {/* autoPlay loop */}
            <video autoPlay loop muted={this.state.muted} className="mainVideo" id="mainvid" > <source src={this.props.videos[0].video_url} type="video/mp4"/> </video> 
            {/* <div className='mainVideoDescription'>{IndividualVideos[1].props.video.description}</div> */}
          {/* <Link to={`/browse/${video.id}`}>Play</Link>  */}
          <img src={window.inceptionlogo} className="mainvideoLogo"/>
          {!this.state.muted ? 
          <img src={window.soundon} className="soundindex" id="soundon" onClick={this.handleMute}/> : 
          <img src={window.soundoff} className="soundindex" id="soundoff" onClick={this.handleMute}/> }
          <div id="mainvidrating">
            <p >{IndividualVideos[0].props.video.maturity_rating}</p>
          </div>
          <div onClick= { () => this.props.history.push(`/browse/${IndividualVideos[0].props.video.id}`)} className="playButton transparentPlay"> <img src={window.playicon}/> <p className="playText">Play</p> </div>
          {this.state.indexlist ? 
              <div onClick={this.handleMyList} className="playButton transparentPlay" id="addlistbutton"> <img src={window.indexListRemove} /> <p className="playText">My List</p> </div> :
              <div onClick={this.handleMyList} className="playButton transparentPlay" id="addlistbutton"> <img src={window.indexListAdd} /> <p className="playText">My List</p> </div> }
          {/* {this.props.mylists.forEach(list => {
            if (list.video_id === IndividualVideos[0].props.video.id){
              listbutton = <div onClick={() => this.props.deleteMyList(IndividualVideos[0].props.video.id)} className="playButton transparentPlay" id="addlistbutton"> <img src={window.indexListRemove} /> <p className="playText">My List</p> </div>
            }
            else{
              listbutton = <div onClick={() => this.props.createMyList(IndividualVideos[0].props.video.id)} className="playButton transparentPlay" id="addlistbutton"> <img src={window.indexListAdd} /> <p className="playText">My List</p> </div>
            }
          })}
          {listbutton} */}
          {/* <div onClick={() => this.props.createMyList(IndividualVideos[0].props.video.id)} className="playButton transparentPlay" id="addlistbutton"> <img src={window.indexListAdd}/> <p className="playText">My List</p> </div> */}
          



          <div className="rowsection"> 
            <p className="genreName" >Fantasy/Sci-fi</p>
            <div className='blockrow'>
  
              <div className='videodivfirst'>
                <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}>
                  {IndividualVideos[0]}
                    {this.state.listchange[0] ?
                      <img className="addList hiddenIcons" src={window.indexListRemove} onClick={() => this.handleVideoList(IndividualVideos[0])}/>   :
                      <img className="addList hiddenIcons" src={window.indexListAdd} onClick={() => this.handleVideoList(IndividualVideos[0])}/> }
                </div>
              </div>


              {/* <div className='videodiv'>
                <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}>
                  {IndividualVideos[1]}
                </div>
              </div>

              <div >
                  <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave} className='videodiv'>
                  {IndividualVideos[2]}
                </div>
              </div>

              <div >
                  <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave} className='videodiv'>
                  {IndividualVideos[3]}
                </div>
              </div>

              <div className='videodiv'>
                <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}>
                  {IndividualVideos[4]}
                </div>
              </div>

              <div >
                <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave} className="videodivlast">
                  {IndividualVideos[5]}
                </div>
              </div> */}

              
            </div>
          </div>


          

          
          



        </div> : <div className='mainBackground'> </div>}

        {IndividualVideos.length >= 2 ? 
        
        <div className="middlebottomhalf">
          <div className="secondsection">
            <p className="genreName2" >Comedy</p>
            <div className='blockrow2'>
              <div className='videodivfirst'>
                  <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}>
                    {IndividualVideos[6]} 
                  </div>
              </div>
                  

              {/* <div className='videodiv'>
                <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}>
                  {IndividualVideos[7]}
                </div>
              </div>
              
              <div className='videodiv'>
                <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}>
                  {IndividualVideos[8]}
                </div>
              </div>

              <div className='videodiv'>
                <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}>
                  {IndividualVideos[9]}
                </div>
              </div>

              <div className='videodiv'>
                <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}>
                  {IndividualVideos[10]}
                </div>
              </div>

              <div >
                <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave} className="videodivlast">
                  {IndividualVideos[11]}
                </div>
              </div> */}

            </div>
          </div>



          <div className="secondsection">
            <p className="genreName2" >Because you watched Bohemian Rhapsody</p>
            <div className='blockrow2'>
              

              <div className='videodivfirst'>
                <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}>
                  {IndividualVideos[18]}
                </div>
              </div>

              {/* <div className='videodiv'>
                <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}>
                  {IndividualVideos[19]}
                </div>
              </div>

              <div >
                  <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave} className='videodiv'>
                  {IndividualVideos[20]}
                </div>
              </div>

              <div className='videodiv'>
                <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}>
                  {IndividualVideos[21]}
                </div>
              </div>

              <div className='videodiv'>
                <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}>
                  {IndividualVideos[22]}
                </div>
              </div>

              <div >
                <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave} className="videodivlast">
                  {IndividualVideos[23]}
                </div>
              </div> */}

            </div>
          </div> 




          <div className="secondsection">
            <p className="genreName2" >Children & Family Movies</p>
            <div className='blockrow2'>
              {/* <div onClick={() => this.props.history.push(`/browse/${IndividualVideos[12].props.video.id}`)} className='videodivfirst'>
                <video className="rowvideo" poster={IndividualVideos[12].props.video.photo_url} onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}> <source src={IndividualVideos[12].props.video.video_url} type="video/mp4" /> </video>
              </div> */}

              {/* <div onClick={() => this.props.history.push(`/browse/${IndividualVideos[13].props.video.id}`)} className='videodiv'>
                <video className="rowvideo" poster={IndividualVideos[13].props.video.photo_url} onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}> <source src={IndividualVideos[13].props.video.video_url} type="video/mp4" /> </video>
              </div>

              <div onClick={() => this.props.history.push(`/browse/${IndividualVideos[16].props.video.id}`)} className='videodiv'>
                <video className="rowvideo" poster={IndividualVideos[16].props.video.photo_url} onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}> <source src={IndividualVideos[16].props.video.video_url} type="video/mp4" /> </video>
              </div>


              <div onClick={() => this.props.history.push(`/browse/${IndividualVideos[15].props.video.id}`)} className='videodiv'>
                <video className="rowvideo" poster={IndividualVideos[15].props.video.photo_url} onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}> <source src={IndividualVideos[15].props.video.video_url} type="video/mp4" /> </video>
              </div>

              <div onClick={() => this.props.history.push(`/browse/${IndividualVideos[14].props.video.id}`)} className='videodiv'>
                <video className="rowvideo" poster={IndividualVideos[14].props.video.photo_url} onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}> <source src={IndividualVideos[14].props.video.video_url} type="video/mp4" /> </video>
              </div>

              <div onClick={() => this.props.history.push(`/browse/${IndividualVideos[17].props.video.id}`)} className='videodivlast'>
                <video className="rowvideo" poster={IndividualVideos[17].props.video.photo_url} onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}> <source src={IndividualVideos[17].props.video.video_url} type="video/mp4" /> </video>
              </div> */}





                <div className='videodivfirst'>
                  <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}>
                    {IndividualVideos[12]}
                  </div>
                </div>

                {/* <div className='videodiv'>
                  <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}>
                    {IndividualVideos[13]}
                  </div>
                </div>

                <div >
                  <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave} className='videodiv'>
                    {IndividualVideos[14]}
                  </div>
                </div>

                <div className='videodiv'>
                  <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}>
                    {IndividualVideos[15]}
                  </div>
                </div>

                <div className='videodiv'>
                  <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave}>
                    {IndividualVideos[16]}
                  </div>
                </div>

                <div className="videodivlast">
                  <div onMouseOver={this.handleHoverPlay} onMouseLeave={this.handleHoverLeave} >
                    {IndividualVideos[17]}
                  </div>
                </div> */}
              
            </div>
          </div> 




            <div className="bottomhalf"> 
              <div className="bottomdivtext">
                <p className='footertext'>Questions? Email KevinKTom@gmail.com</p>
                <a href="https://github.com/kevinktom" className="github"><img src={window.github} /> </a>
                <a href="https://www.linkedin.com/in/kevin-tom-b36951a9/" className="linkedin"><img src={window.linkedin} /> </a> 
              </div>
            </div>
        </div>

          : <div className="bottomhalf"></div>}
      {/* <h1>Welcome to the best version of Netflix</h1> */}
        {/* {IndividualVideos.lenprops.video.gth >= 1 ?
          <div>
      <video controls className='testvid' > <source src={IndividualVideos[0].props.video.video_url} type="video/mp4" /> </video> 
          </div> : <div className='mainBackground'> </div>} */}
      {/* <button onClick={this.props.logoutCurrentUser}>Logout</button> */}
    </div>
  )
  }
}



export default Videos;



