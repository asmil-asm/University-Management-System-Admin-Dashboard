import './Login.css';
import image from '../../assets/admin/logo.jpg';
import PageTransition from '../../components/PageTransition/PageTransition';
import { useTranslation } from 'react-i18next';
import { useChange } from '../../store/useChange';
import useLogin from '../../Hooks/useLogin';

const Login = () => { 

  const {form,setForm}=useChange()
  const { t } = useTranslation();
  const {login, isLoading}=useLogin()

  
const handleSubmit=(e)=>{
e.preventDefault();
    login(form);
  }

  

  return (
    <div className='login'>
      <div className="image">
        <img src={image} alt="University Layout" />
        <div className="shadow"></div>
      </div>
      <PageTransition>
        <div className='flex justify-center items-center w-full'>
          <div className="form">
            <h1>{t('Welcome')}</h1>
            <form onSubmit={handleSubmit}>
              <label>{t('Username')}:</label>
              <input 
                onChange={setForm} 
                placeholder={t('Username')} 
                type="text" 
                name='username' 
                value={form.username} 
                autoComplete="username"
              />
              
              <label>{t('Password')}:</label>
              <input 
                onChange={setForm} 
                placeholder={t('Password')} 
                type='password' 
                name='password' 
                value={form.password} 
                autoComplete="current-password"
              />
              <div className='flex flex-col'>
<span>admin</span>
<span>admin123</span>
              </div>
              <button className={isLoading?'bg-gray-400':''} type="submit" >
                { isLoading ? t('Login...') :t('Login')}
              </button>
            </form>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}

export default Login;