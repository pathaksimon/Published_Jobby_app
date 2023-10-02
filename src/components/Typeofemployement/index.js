import './index.css'

const Typeofemployement = props => {
  const {type, Jobfilter} = props
  const {label, employmentTypeId} = type

  const employement = event => {
    Jobfilter(employmentTypeId)
  }

  return (
    <li onClick={employement} className="lista">
      <input id={label} type="checkbox" />
      <label className="checky" htmlFor={label}>
        <p>{label}</p>
      </label>
    </li>
  )
}

export default Typeofemployement
