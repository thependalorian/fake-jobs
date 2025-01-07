// Sample job listings data
const jobs = [
    {
        id: 1,
        title: "Energy Storage Project Manager",
        company: "Eastern Grid Solutions",
        location: "Cambridge, MA",
        type: "Full-time",
        category: "grid",
        posted: "2024-01-05",
        salary: "$95,000 - $120,000",
        description: `Lead energy storage integration projects across Massachusetts. Work with utilities and municipalities to implement cutting-edge battery storage solutions. Part of the MA Clean Energy Center's Grid Modernization program.

Key Responsibilities:
• Manage 5-10 concurrent energy storage projects
• Coordinate with utilities on interconnection requirements
• Oversee project budgets ranging from $2M to $10M
• Ensure compliance with MA DPU regulations
• Lead customer and stakeholder communications

Requirements:
• 5+ years project management experience in energy sector
• Strong understanding of battery storage technologies
• Experience with utility interconnection processes
• PMP certification preferred
• Knowledge of MA energy regulations`,
        region: "Greater Boston"
    },
    {
        id: 2,
        title: "Offshore Wind Technician",
        company: "Vineyard Wind",
        location: "New Bedford, MA",
        type: "Full-time",
        category: "wind",
        posted: "2024-01-04",
        salary: "$75,000 - $95,000",
        description: `Join the rapidly growing offshore wind industry in Massachusetts. Position based at the New Bedford Marine Commerce Terminal, supporting Vineyard Wind's offshore operations.

Key Responsibilities:
• Perform maintenance on wind turbine components
• Conduct regular inspections and testing
• Document maintenance activities and findings
• Work with advanced monitoring systems
• Participate in emergency response procedures

Requirements:
• Technical degree or relevant certification
• GWO Basic Safety Training (or ability to obtain)
• Experience with mechanical/electrical systems
• Comfortable working at heights
• Valid TWIC card required`,
        region: "Southeast MA"
    },
    {
        id: 3,
        title: "Clean Transportation Program Director",
        company: "MassEV Alliance",
        location: "Boston, MA",
        type: "Full-time",
        category: "ev",
        posted: "2024-01-03",
        salary: "$110,000 - $140,000",
        description: `Lead Massachusetts' electric vehicle infrastructure initiatives and support the state's goal of 750,000 EVs by 2030. 

Key Responsibilities:
• Develop and implement EV infrastructure strategy
• Coordinate with state agencies and utilities
• Manage program budgets and grant applications
• Lead public-private partnerships
• Oversee charging infrastructure planning

Requirements:
• 8+ years in transportation or energy sector
• Experience with public policy and programs
• Strong stakeholder management skills
• Background in infrastructure planning
• Knowledge of MA transportation policies`,
        region: "Greater Boston"
    },
    {
        id: 4,
        title: "Solar Installation Manager",
        company: "BrightPath Solar",
        location: "Worcester, MA",
        type: "Full-time",
        category: "solar",
        posted: "2024-01-02",
        salary: "$85,000 - $105,000",
        description: `Manage residential and commercial solar installations across Central Massachusetts. Lead multiple installation teams and ensure project success.

Key Responsibilities:
• Oversee 10-15 concurrent solar installations
• Manage installation crews and schedules
• Ensure quality control and safety compliance
• Coordinate with local building departments
• Handle customer relations during installation

Requirements:
• NABCEP certification required
• 5+ years solar installation experience
• MA Electrical License preferred
• Strong project management skills
• Experience with crew management`,
        region: "Worcester Area"
    }
];

// Function to render job listings
function renderJobs(jobsToShow = jobs) {
    const jobsContainer = document.querySelector('.jobs-container');
    document.getElementById('jobs-count').textContent = jobsToShow.length;

    jobsContainer.innerHTML = jobsToShow.map(job => `
        <div class="job-card">
            <div class="job-header">
                <div class="job-title-section">
                    <h3 class="job-title">${job.title}</h3>
                    <span class="company-name">${job.company}</span>
                </div>
                <div class="job-meta">
                    <span class="location">
                        <i class="fas fa-map-marker-alt"></i> ${job.location}
                    </span>
                    <span class="job-type">
                        <i class="fas fa-briefcase"></i> ${job.type}
                    </span>
                    <span class="salary">
                        <i class="fas fa-dollar-sign"></i> ${job.salary}
                    </span>
                </div>
            </div>
            
            <div class="job-description">
                ${job.description}
            </div>

            <div class="job-footer">
                <div class="job-actions">
                    <button class="apply-btn">Apply Now</button>
                    <button class="save-job">Save</button>
                </div>
                <span class="post-date">Posted ${formatDate(job.posted)}</span>
            </div>
        </div>
    `).join('');
}

// Helper function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Filter jobs function
function filterJobs() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const locationTerm = document.getElementById('location').value.toLowerCase();
    const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value);

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = 
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm);
            
        const matchesLocation = 
            !locationTerm || 
            job.location.toLowerCase().includes(locationTerm) ||
            job.region.toLowerCase().includes(locationTerm);
            
        const matchesCategory = 
            selectedCategories.length === 0 ||
            selectedCategories.includes(job.category);
            
        return matchesSearch && matchesLocation && matchesCategory;
    });
    
    renderJobs(filteredJobs);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    renderJobs();
    
    // Add event listeners for search and filters
    document.getElementById('search').addEventListener('input', filterJobs);
    document.getElementById('location').addEventListener('input', filterJobs);
    document.querySelectorAll('.filter-section input[type="checkbox"]')
        .forEach(cb => cb.addEventListener('change', filterJobs));
    
    // Sort functionality
    document.getElementById('sort-by').addEventListener('change', (e) => {
        let sortedJobs = [...jobs];
        switch(e.target.value) {
            case 'title':
                sortedJobs.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'company':
                sortedJobs.sort((a, b) => a.company.localeCompare(b.company));
                break;
            case 'salary':
                sortedJobs.sort((a, b) => {
                    const aSalary = parseInt(a.salary.replace(/[^0-9]/g, ''));
                    const bSalary = parseInt(b.salary.replace(/[^0-9]/g, ''));
                    return bSalary - aSalary;
                });
                break;
            default:
                sortedJobs.sort((a, b) => new Date(b.posted) - new Date(a.posted));
        }
        renderJobs(sortedJobs);
    });
});
