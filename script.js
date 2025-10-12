const form = document.getElementById('issueForm');
const issueList = document.getElementById('issueList');
const filterCategory = document.getElementById('filterCategory');
const filterStatus = document.getElementById('filterStatus');
const clearBtn = document.getElementById('clearBtn');

const totalCount = document.getElementById('totalCount');
const openCount = document.getElementById('openCount');
const inprogressCount = document.getElementById('inprogressCount');
const closedCount = document.getElementById('closedCount');

let issues = JSON.parse(localStorage.getItem('civic_issues') || '[]');

function save() {
  localStorage.setItem('civic_issues', JSON.stringify(issues));
  render();
}

function addIssue(data) {
  data.id = Date.now();
  data.status = 'open';
  issues.unshift(data);
  save();
}

function changeStatus(id, status) {
  const issue = issues.find(i => i.id === id);
  if (issue) issue.status = status;
  save();
}

function removeIssue(id) {
  issues = issues.filter(i => i.id !== id);
  save();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = {
    title: document.getElementById('title').value.trim(),
    category: document.getElementById('category').value,
    description: document.getElementById('description').value.trim(),
    location: document.getElementById('location').value.trim()
  };
  if (!data.title) return alert('Please enter a title');
  addIssue(data);
  form.reset();
});

filterCategory.addEventListener('change', render);
filterStatus.addEventListener('change', render);
clearBtn.addEventListener('click', () => {
  if (confirm('Clear all issues?')) {
    issues = [];
    save();
  }
});

function createIssueNode(issue) {
  const div = document.createElement('div');
  div.className = 'issue';
  div.innerHTML = `
    <div>
      <h3>${issue.title}</h3>
      <p>${issue.description}</p>
      <small>${issue.category} • ${issue.location}</small>
    </div>
    <div>
      <span class="pill">${issue.status}</span><br>
      <button class="ghost small" onclick="changeStatus(${issue.id}, 'inprogress')">In Progress</button>
      <button class="ghost small" onclick="changeStatus(${issue.id}, 'closed')">Close</button>
      <button class="small" onclick="removeIssue(${issue.id})">Delete</button>
    </div>
  `;
  return div;
}

function render() {
  issueList.innerHTML = '';
  const cat = filterCategory.value;
  const stat = filterStatus.value;
  const filtered = issues.filter(i => 
    (cat === 'all' || i.category === cat) &&
    (stat === 'all' || i.status === stat)
  );
  filtered.forEach(i => issueList.appendChild(createIssueNode(i)));

  totalCount.textContent = issues.length;
  openCount.textContent = issues.filter(i => i.status === 'open').length;
  inprogressCount.textContent = issues.filter(i => i.status === 'inprogress').length;
  closedCount.textContent = issues.filter(i => i.status === 'closed').length;
}

render();
