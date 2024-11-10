import './Parent.css';
import Main from './Main';
import './Snowfall.css'
import Snowfall from './Snowfall';  
import AudioPlayer from './Music';


function Parent() {
  return (
    
    <div>
      <Snowfall/>
      <div className="container">
        <div className='topSpace'/>
        <div className='rightSpace'></div>
        <div className='leftSpace'/>
        <div className='bottomSpace'></div>
        <div className='music'></div>
        <Main /> 
        <AudioPlayer />
      </div>
</div>
       
  );
}

export default Parent;
