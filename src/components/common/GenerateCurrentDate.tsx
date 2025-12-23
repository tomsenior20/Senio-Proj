export default function GenerateCurrentDate() {
  const date = new Date();
  // If date isn't valid break out
  if (!date) {
    return;
  }

  // Valid date then convert to date string
  const dateString = date.toDateString();
  return (
    <div className='currentDateContainer'>
      <p className='curDateText'>{dateString}</p>
    </div>
  );
}
