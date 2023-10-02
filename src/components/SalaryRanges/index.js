import './index.css'

const SalaryRanges = props => {
  const {type1, salaryfilter} = props
  const {label, salaryRangeId} = type1

  const salary = event => {
    salaryfilter(salaryRangeId)
  }

  return (
    <li onClick={salary} className="lista">
      <input id={label} type="radio" name="radio" />
      <label className="labeling" htmlFor={label}>
        {label}
      </label>
    </li>
  )
}
export default SalaryRanges
