import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const { name, email, password, password2 } = formData
  const dispatch = useDispatch()
  // prettier-ignore
  const { user, isLoading, isSuccess, message, isError } = useSelector((state) => state.auth);
  // prettier-ignore-end

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
        .unwrap()
        .then((user) => {
          toast.success(`Registered new user - ${user.name}`)
          navigate('/')
        })
        .catch((err) => {
          console.log(err)

          toast.error(err)
        })
    }
  }
  // if (isLoading) {
  //   return Spinner;
  // }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please Create an Account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              id="name"
              type="text"
              className="form-control"
              value={name}
              name="name"
              onChange={onChange}
              placeholder="enter you name"
            />
          </div>
          <div className="form-group">
            <input
              id="email"
              type="text"
              className="form-control"
              value={email}
              name="email"
              onChange={onChange}
              placeholder="enter you email"
            />
          </div>
          <div className="form-group">
            <input
              id="password"
              type="text"
              className="form-control"
              value={password}
              name="password"
              onChange={onChange}
              placeholder="enter you password"
            />
          </div>
          <div className="form-group">
            <input
              id="password2"
              type="text"
              className="form-control"
              value={password2}
              name="password2"
              onChange={onChange}
              placeholder="confirm password"
            />
          </div>

          <div className="form-control">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
