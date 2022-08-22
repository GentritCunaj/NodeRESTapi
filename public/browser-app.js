const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskNameInputDOM = document.querySelector('#name-input')
const taskAuthorInputDOM = document.querySelector('#author-input')
const taskPagesInputDOM = document.querySelector('#pages-input')
const taskPagesCompletedInputDOM = document.querySelector('#pagesCompleted-input')
const taskYearInputDOM = document.querySelector('#year-input')
const formAlertDOM = document.querySelector('.form-alert')
// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { tasks },
    } = await axios.get('/api/v1/tasks')
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No books in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, title:name,author,pages,pagesCompleted,percentage } = task
        return `<div class="single-task ${completed && 'task-completed'}">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<h6>By ${author}</h6>
<p class="percentage">${percentage}% done</p>
<div class="task-links">



<!-- edit link -->
<a href="task.html?id=${taskID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${taskID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`
      })
      .join('')
    tasksDOM.innerHTML = allTasks
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showTasks()

// delete task /api/tasks/:id

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  console.log(el.closest('div'))
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id

    try {
      await axios.delete(`/api/v1/tasks/${id}`)
      showTasks()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskNameInputDOM.value
  const author = taskAuthorInputDOM.value;
  const pages = taskPagesInputDOM.value;
  const pagesCompleted = taskPagesCompletedInputDOM.value
  const year = taskYearInputDOM.value
  const percentage = Math.round((pagesCompleted/pages)*100)
  const completed = percentage === 100 ? true:false;
 
  try {
    
    await axios.post('/api/v1/tasks',  {"author": author,
    "title": name,
    "pages": pages,
    "pagesCompleted": pagesCompleted,
    "year": year,
    "percentage":percentage,
    "completed":completed
  })
    showTasks()
    taskNameInputDOM.value = ''
    taskAuthorInputDOM.value = ''
    taskPagesInputDOM.value = ''
    taskPagesCompletedInputDOM.value = ''
    taskYearInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
