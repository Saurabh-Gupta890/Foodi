import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useForm } from 'react-hook-form';

const UserProfile = () => {
    const { updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imageUrl, setImageUrl] = useState('');
    const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

    const onSubmit = async (data) => {
        const name = data.name;

        let photoURL = imageUrl;
        if (data.photoFile[0]) {
            photoURL = await uploadImage(data.photoFile[0]);
        }

        updateUserProfile(name, photoURL).then(() => {
            alert("Profile updated successfully");
        }).catch((error) => {
            console.log(error);
        });
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(imageHostingApi, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                const imageUrl = result.data.url;
                setImageUrl(imageUrl);
                return imageUrl;
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            return '';
        }
    };

    return (
        <div className='h-screen max-w-md mx-auto flex items-center justify-center '>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name")} placeholder="Your name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Upload Photo</span>
                        </label>
                        <input type="file" {...register("photoFile")} className="file-input w-full mt-1" />
                        {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-4" />}
                    </div>
                    <div className="form-control mt-6">
                        <input type='submit' value={"Update"} className="btn bg-green text-white" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;
