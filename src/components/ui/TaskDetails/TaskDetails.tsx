const TaskDetails = async () => {
  const data = await fetch("https://api.vercel.app/blog");

  return <div>Task Name</div>;
};

export default TaskDetails;
