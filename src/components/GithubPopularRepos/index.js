import {Component} from 'react'

import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const ApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    updateList: languageFiltersData[0].id,
    List: [],
    status: ApiStatus.initial,
  }

  componentDidMount() {
    this.GetRepository()
  }

  GetRepository = async () => {
    const {updateList, List, status} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${updateList}`,
    )
    const data = await response.json()

    if (response.ok) {
      const updateData = data.popular_repos.map(each => ({
        id: each.id,
        imageUrl: each.avtar_url,
        name: each.name,
        issueCount: each.issue_count,
        forkCount: each.fork_count,
        starCount: each.start_count,
      }))
      this.setState({List: updateData, status: ApiStatus.success})
    } else {
      this.setState({status: ApiStatus.failure})
    }
  }

  buttonIdSelect = id => {
    this.setState({updateList: id}, this.GetRepository)
  }

  renderLangaugeFilterList = () => {
    const {updateList, List} = this.state

    return (
      <ul className="un-list">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            key={eachItem.id}
            detailsoflanguage={eachItem}
            buttonIdSelect={this.buttonIdSelect}
            isActive={eachItem.id === updateList}
          />
        ))}
      </ul>
    )
  }

  renderApistatusSuccess = () => {
    const {List} = this.state
    return (
      <div>
        <h1>hi</h1>
      </div>
    )
  }

  renderApiListContainer = () => {
    const {status} = this.state

    switch (status) {
      case ApiStatus.initial:
        return this.renderApistatusSuccess()
      default:
        return null
    }
  }

  render() {
    const {updateList, List} = this.state

    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        {this.renderLangaugeFilterList()}
        {this.renderApiListContainer()}
      </div>
    )
  }
}

export default GithubPopularRepos
