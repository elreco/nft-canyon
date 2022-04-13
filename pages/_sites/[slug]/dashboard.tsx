const Dashboard = () => {
  return 'Redirecting to home'
}

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: '/'
    }
  }
}

export default Dashboard
