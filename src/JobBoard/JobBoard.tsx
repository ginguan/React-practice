import { useEffect, useState } from 'react'

interface Job {
  id: number
  by: string
  time: number
  title: string
  type: string
  url?: string
}

const JobBoard = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [visibleJobs, setVisibleJobs] = useState<Job[]>([])
  const [page, setPage] = useState(0)
  const jobsPerPage = 6

  useEffect(() => {
    const fetchJobIds = async () => {
        try {
          const response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          const jobIds = await response.json()
          fetchJobsDetails(jobIds.slice(0, 24))
        } catch (error) {
          console.error("Failed to fetch job IDs:", error)
        }
      }
      

    // Define fetchJobsDetails inside the useEffect or make it a useCallback if used elsewhere
    const fetchJobsDetails = async (jobIds: number[]) => {
      const jobsPromises = jobIds.map(id =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(response => response.json())
      )
      const jobs: Job[] = await Promise.all(jobsPromises)
      setJobs(jobs)
      setVisibleJobs(jobs.slice(0, jobsPerPage))
    }

    fetchJobIds()
  }, []) // Empty dependency array means this effect runs once on mount

  // Load more jobs functionality
  const loadMoreJobs = () => {
    const nextPage = page + 1
    const nextJobs = jobs.slice(nextPage * jobsPerPage, (nextPage + 1) * jobsPerPage)
    setVisibleJobs(prevJobs => [...prevJobs, ...nextJobs])
    setPage(nextPage)
  }

  return (
    <div className="job-board">
      <h1>Latest Job Postings</h1>
      <ul>
        {visibleJobs.map(job => (
          <li key={job.id}>
            {job.url ? (
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                {job.title}
              </a>
            ) : (
              <span>{job.title}</span>
            )}
            <p>Posted by: {job.by}</p>
            <p>Date Posted: {new Date(job.time * 1000).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
      {page * jobsPerPage + jobsPerPage < jobs.length && (
        <button onClick={loadMoreJobs}>Load more</button>
      )}
    </div>
  )
}

export default JobBoard
