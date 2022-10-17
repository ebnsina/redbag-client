import { ArrowUturnUpIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/auth-context';
import { uploadImage } from '../../services/post';
import { updateUser } from '../../services/user';
import Button from '../ui/button';

function ProfileForm({ profileFormClose }) {
  const [authState, setAuthState] = useContext(AuthContext);

  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [about, setAbout] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [lastDonate, setLastDonate] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (authState && authState.token) {
      setFirstname(authState?.user?.firstName);
      setLastname(authState?.user?.lastName);
      setEmail(authState?.user?.email);
      setUsername(authState?.user?.username);
      setLocation(authState?.user?.location);
      setAbout(authState?.user?.about);
      setPhone(authState?.user?.phone);
      setBloodGroup(authState?.user?.bloodGroup);
      setLastDonate(authState?.user?.lastDonate);
      setGender(authState?.user?.gender);
      setDob(authState?.user?.dob);
    }
  }, [authState && authState.token]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const user = {
        firstName,
        lastName,
        email,
        username,
        password,
        location,
        phone,
        bloodGroup,
        lastDonate,
        gender,
        image,
        about,
        dob,
      };

      const { data } = await updateUser(user);
      toast.success('Profile updated successfully.');
      const authData = JSON.parse(localStorage.getItem('rb-auth'));
      authData.user = data;
      window.localStorage.setItem('rb-auth', JSON.stringify(authData));
      setAuthState({ ...authState, user: data });
      profileFormClose();
    } catch (error) {
      console.log(error);
    }
  };

  const imageUploadHandler = async (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    if (file?.size > MAX_FILE_SIZE) {
      return toast.error(`Max file size 5mb`);
    }

    let formData = new FormData();
    formData.append('image', file);

    try {
      setIsUploading(true);
      const { data } = await uploadImage(formData);
      const { url, public_id } = data;

      console.log({ data, formData, file });

      if (data) {
        setImage({ url, public_id });
      }

      setIsUploading(false);
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className='fixed inset-0 bg-black/75 w-screen h-screen z-20'></div>
      <div className='fixed overflow-y-scroll max-h-[95vh] top-8 right-8 left-5 z-30 border border-none max-w-3xl mx-auto bg-white p-4 rounded-xl shadow-md'>
        <h3 className='text-xl text-center mb-5'>Edit Profile</h3>

        <form onSubmit={submitHandler}>
          <div className='mb-3'>
            <label
              className='block text-sm text-slate-600 mb-1'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className='px-4 py-3 border-b border-slate-400 rounded-xl w-full disabled:bg-slate-200 disabled:cursor-not-allowed'
              type='text'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>

          <div className='grid md:grid-cols-4 md:gap-4 mb-3'>
            <div>
              <label
                className='block text-sm text-slate-600 mb-1'
                htmlFor='firstName'
              >
                First Name
              </label>
              <input
                className='px-4 py-3 border-b border-slate-400 rounded-xl w-full'
                type='text'
                name='firstName'
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label
                className='block text-sm text-slate-600 mb-1'
                htmlFor='lastName'
              >
                Last Name
              </label>
              <input
                className='px-4 py-3 border border-slate-400 rounded-xl w-full'
                type='text'
                name='lastName'
                value={lastName}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div>
              <label
                className='block text-sm text-slate-600 mb-1'
                htmlFor='username'
              >
                Username
              </label>
              <input
                className='px-4 py-3 border-b border-slate-400 rounded-xl w-full'
                type='text'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label
                className='block text-sm text-slate-600 mb-1'
                htmlFor='phone'
              >
                Phone
              </label>
              <input
                className='px-4 py-3 border border-slate-400 rounded-xl w-full'
                type='text'
                name='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className='grid md:grid-cols-2 md:gap-4 mb-3'>
            <div>
              <label
                className='block text-sm text-slate-600 mb-1'
                htmlFor='password'
              >
                Password
              </label>
              <input
                className='px-4 py-3 border-b border-slate-400 rounded-xl w-full'
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                className='block text-sm text-slate-600 mb-1'
                htmlFor='location'
              >
                Location
              </label>
              <input
                className='px-4 py-3 border border-slate-400 rounded-xl w-full'
                type='text'
                name='location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label
                className='block text-sm text-slate-600 mb-1'
                htmlFor='about'
              >
                About
              </label>
              <textarea
                id=''
                rows='2'
                className='px-4 py-3 border border-slate-400 rounded-xl w-full'
                type='text'
                name='about'
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>

            <label className='block' htmlFor='updateImage'>
              <input
                type='file'
                name='image'
                className=''
                id='updateImage'
                accept='images/*'
                onChange={imageUploadHandler}
                hidden
              />

              {image && image?.url ? (
                <div
                  className='mt-7 border border-dashed border-slate-400 px-4 py-2 rounded-xl'
                  key={image?.public_id}
                >
                  <Image
                    src={image.url}
                    width={40}
                    height={40}
                    className='rounded-xl object-cover'
                    alt=''
                  />
                </div>
              ) : isUploading ? (
                <p className='border border-dashed border-slate-400 flex justify-center items-center text-center my-3'>
                  Uploading Image ...
                </p>
              ) : (
                <div className='block px-4 py-6 mt-6 border border-dashed border-slate-400 rounded-xl w-full'>
                  <span className='block text-center text-sm text-slate-600'>
                    Upload Image
                  </span>
                </div>
              )}
            </label>
          </div>

          <div className='grid md:grid-cols-2 md:gap-4 mb-3'>
            <div>
              <label
                className='block text-sm text-slate-600 mb-1'
                htmlFor='bloodGroup'
              >
                Blood Group
              </label>

              <select
                name='bloodGroup'
                id='bloodGroup'
                className='px-4 py-3 border border-slate-400 rounded-xl w-full'
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value=''>Select blood group</option>
                <option value='A+'>A+</option>
                <option value='A-'>A-</option>
                <option value='B+'>B+</option>
                <option value='B-'>B-</option>
                <option value='O+'>O+</option>
                <option value='O-'>O-</option>
                <option value='AB+'>AB+</option>
                <option value='AB-'>AB-</option>
              </select>
            </div>
            <div>
              <label
                className='block text-sm text-slate-600 mb-1'
                htmlFor='lastDonate'
              >
                Last Donate
              </label>
              <input
                className='px-4 py-3 border border-slate-400 rounded-xl w-full'
                type='date'
                name='lastDonate'
                value={lastDonate}
                onChange={(e) => setLastDonate(e.target.value)}
              />
            </div>
          </div>

          <div className='grid md:grid-cols-2 md:gap-4 mb-3'>
            <div>
              <label
                className='block text-sm text-slate-600 mb-1'
                htmlFor='gender'
              >
                Gender
              </label>

              <select
                name='gender'
                id='gender'
                className='px-4 py-3 border border-slate-400 rounded-xl w-full'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value=''>Select gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='n/a'>Rather not to say</option>
              </select>
            </div>
            <div>
              <label
                className='block text-sm text-slate-600 mb-1'
                htmlFor='dob'
              >
                Date of birth
              </label>
              <input
                className='px-4 py-3 border border-slate-400 rounded-xl w-full'
                type='date'
                name='dob'
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
          </div>

          <div className='flex justify-between gap-4 items-center mt-5'>
            <button
              onClick={profileFormClose}
              className='bg-slate-100 px-4 py-3 rounded-xl w-1/2'
            >
              Cancel
            </button>
            <Button className='w-1/2'>Update</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
