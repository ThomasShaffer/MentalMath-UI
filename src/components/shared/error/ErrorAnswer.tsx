import Image from 'react-bootstrap/Image';
import './ErrorAnswer.css';
export const ErrorAnswer = (props: any) => {
    return (
        <div className="image-div">
        <Image key={props.error} hidden={props.error} roundedCircle={true} src={require('../../../monkey.jpg')}/>
        </div>
    );
}
