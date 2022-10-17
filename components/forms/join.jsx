import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { register } from '../../services/auth';
import Button from '../ui/button';

function JoinForm() {
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const email = formData.get('email');
      const password = formData.get('password');
      const location = formData.get('location');
      const phone = formData.get('phone');
      const bloodGroup = formData.get('bloodGroup');
      const lastDonate = formData.get('lastDonate');
      const gender = formData.get('gender');
      const dob = formData.get('dob');

      const newUser = {
        firstName,
        lastName,
        email,
        password,
        location,
        phone,
        bloodGroup,
        lastDonate,
        gender,
        dob,
      };

      const { data } = await register(newUser);
      toast.success('User created successfully.');
      router.push('/signin');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='grid md:grid-cols-2 md:gap-4 mb-3'>
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
            placeholder='Ebn'
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
            placeholder='Sina'
          />
        </div>
      </div>
      <div className='grid md:grid-cols-2 md:gap-4 mb-3'>
        <div>
          <label className='block text-sm text-slate-600 mb-1' htmlFor='email'>
            Email
          </label>
          <input
            className='px-4 py-3 border border-slate-400 rounded-xl w-full'
            type='text'
            name='email'
            placeholder='ebnsina@gmail.com'
          />
        </div>
        <div>
          <label
            className='block text-sm text-slate-600 mb-1'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className='px-4 py-3 border border-slate-400 rounded-xl w-full'
            type='password'
            name='password'
            placeholder='********'
          />
        </div>
      </div>

      <div className='grid md:grid-cols-2 md:gap-4 mb-3'>
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
            placeholder='Rajshahi'
          />
        </div>
        <div>
          <label className='block text-sm text-slate-600 mb-1' htmlFor='phone'>
            Phone
          </label>
          <input
            className='px-4 py-3 border border-slate-400 rounded-xl w-full'
            type='text'
            name='phone'
            placeholder='+8801712345678'
          />
        </div>
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
            placeholder='Last Donate'
          />
        </div>
      </div>

      <div className='grid md:grid-cols-2 md:gap-4 mb-3'>
        <div>
          <label className='block text-sm text-slate-600 mb-1' htmlFor='gender'>
            Gender
          </label>

          <select
            name='gender'
            id='gender'
            className='px-4 py-3 border border-slate-400 rounded-xl w-full'
          >
            <option value=''>Select gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='n/a'>Rather not to say</option>
          </select>
        </div>
        <div>
          <label className='block text-sm text-slate-600 mb-1' htmlFor='dob'>
            Date of birth
          </label>
          <input
            className='px-4 py-3 border border-slate-400 rounded-xl w-full'
            type='date'
            name='dob'
            placeholder='Last Donate'
          />
        </div>
      </div>

      <div className='mt-5'>
        <Button>Join</Button>
      </div>
    </form>
  );
}

export default JoinForm;
