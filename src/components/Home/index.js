import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = props => {
  const findjobs = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <div className="bg-container2">
      <Header />
      <div className="after-header">
        <div className="inner-card">
          <h1 className="head">Find The Job That Fits Your Life</h1>
          <p className="para">Millions of people are searching for jobs,</p>

          <Link to="/jobs">
            <button type="button" className="find-jobs" onClick={findjobs}>
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
