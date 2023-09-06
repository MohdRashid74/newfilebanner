import './index.css'

const languageFiltersData = props => {
  const {detailsoflanguage, buttonIdSelect, isActive} = props
  const {id, language} = detailsoflanguage
  const ResultButton = isActive ? 'button1' : 'button2'

  const SelectButton = () => {
    buttonIdSelect(id)
  }

  return (
    <li className="list">
      <button type="button" className={ResultButton} onClick={SelectButton}>
        {language}
      </button>
    </li>
  )
}
export default languageFiltersData
