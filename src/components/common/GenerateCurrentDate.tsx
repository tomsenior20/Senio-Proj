export default function GenerateCurrentDate() {
  const date = new Date();
  // Valid date then convert to date string
  const dateString = date.toDateString();
  return (
    <div className='currentDateContainer'>
      <p className='curDateText'>{dateString}</p>
    </div>
  );
}
