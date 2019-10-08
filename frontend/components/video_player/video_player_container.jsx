import { connect } from 'react-redux';
import VideoShow from './videoShow';
import {fetchVideo} from '../../actions/video_actions';

const mapStateToProps = (state, ownProps) => {
    // debugger
    let videoId = ownProps.match.params.videoId;
    debugger
    return ({
        video: state.entities.videos[videoId]

    })
}

const mapDispatchToProps = dispatch => {
    return ({
        fetchVideo: id => dispatch(fetchVideo(id))
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoShow)