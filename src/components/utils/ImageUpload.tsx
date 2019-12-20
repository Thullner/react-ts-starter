import React, {FunctionComponent, useState} from 'react';
import cloud from '../../assets/icons/cloud.png';

interface OwnProps {
    setImage: (image: HTMLImageElement) => void
}

type Props = OwnProps;

interface IForm {
    image64: string | ArrayBuffer | null
}

const ImageUpload: FunctionComponent<Props> = (props) => {

    const [form, setForm] = useState<IForm>({
        image64: ''
    });

    const imageInputRef = React.createRef<HTMLInputElement>()

    const handleImageUpload = (event: any) => {
        const selectedImage = event.target.files[0];

        if (!selectedImage) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(selectedImage);

        fileReader.onload = (e) => {
            setForm({...form, image64: fileReader.result});
        };

        props.setImage(selectedImage);
    };

    return (
        <div className="image-upload">
            <input style={{display: "none"}} type="file" onChange={handleImageUpload} ref={imageInputRef}/>
            <button type="button" className="image-upload-button" style={{backgroundImage: `url(${form.image64})`}}
                    onClick={() => imageInputRef.current
                        && imageInputRef.current.click()}>
                {!form.image64 &&
                    <div>
                        <img src={cloud} alt="cloud"/>
                        <span>Upload image</span>
                    </div>
                }

            </button>
        </div>
    );
};

export default ImageUpload;
