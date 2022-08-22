const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskPagesDOM = document.querySelector('.task-edit-pages')
const taskYearDOM = document.querySelector('.task-edit-year')
const taskAuthorDOM = document.querySelector('.task-edit-author')
const taskPagesCompletedDOM = document.querySelector('.task-edit-pagesCompleted')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName
let tempPages
let tempPagesCompleted
let tempAuthor
let tempYear
const showTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`)
    console.log(task)
    const { _id: taskID, year, title:name, author, pages, pagesCompleted} = task

    taskIDDOM.textContent = taskID

    taskNameDOM.value = name
    tempName = name
    taskPagesDOM.value = pages
    tempPages = pages
    taskPagesCompletedDOM.value = pagesCompleted
    tempPagesCompleted = pagesCompleted
    taskAuthorDOM.value = author
    tempAuthor = author
    taskYearDOM.value = year
    tempYear = year

    
  } catch (error) {
    console.log(error)
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const taskName = taskNameDOM.value
    const taskPages = taskPagesDOM.value;
    const taskPagesCompleted = taskPagesCompletedDOM.value;
    const taskAuthor = taskAuthorDOM.value;
    const taskYear = taskYearDOM.value;
    const {
      data: { task },
    } = await axios.put(`/api/v1/tasks/${id}`, {
      name: taskName,
      pages:taskPages,
      pagesCompleted:taskPagesCompleted,
      pages:taskPages,
      author:taskAuthor,
      year:taskYear
    })

    const { _id: taskID, title:name, author, pages, pagesCompleted,year} = task

    taskIDDOM.textContent = taskID

    taskNameDOM.value = name
    tempName = name
    taskPagesDOM.value = pages
    tempPages = pages
    taskPagesCompletedDOM.value = pagesCompleted
    tempPagesCompleted = pagesCompleted
    taskAuthorDOM.value = author
    tempAuthor = author
    taskYearDOM.value = year
    tempYear = year
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    taskPagesDOM.value = pages
    taskAuthorDOM.value = author
    taskYearDOM.value = year
    taskPagesCompletedDOM.value = pagesCompleted
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
