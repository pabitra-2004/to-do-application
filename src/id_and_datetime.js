// ! generate array item id
export function generateId() {
    return (Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 8));
}

//! only for edit purpose retrieve DD-MM-YYYY hh:mm format
export function convertDateFormat(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

//! used for all time when show date and time DD-MM-YYYY, hh:mm AM/PM
// export function showFormatDate(due_date) {   
//     const date = new Date(due_date);
//     const month = date.getMonth() + 1; 
//     const day = date.getDate();
//     const year = date.getFullYear();

//     let hours = date.getHours();
//     const minutes = date.getMinutes().toString().padStart(2, '0');

//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12 || 12; 

//     return `${day}-${month}-${year}, ${hours}:${minutes} ${ampm}`;
// }





//! used for all time when show date this format DD-MM-YYYY,
export function getDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
  return `${day}-${month}-${year}`;
}


//! used for all time when show time this format hh:mm AM/PM
export function formatDateTime(date, time = null) {
  const date_str = time ? date + "T" + time : date;
  const dateObj = new Date(date_str);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(dateObj.getDate()).padStart(2, "0");

  let time_str = "";
  // if time is given
  if (time) {
    const hour = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const a = hour < 12 || hour == 24 ? "AM" : "PM";

    // hour < 12 ==> AM
    // hour > 12 ==> PM
    // 12 ==> PM
    // 24 ==> AM
    time_str = `, ${hour % 12 || 12}:${minutes} ${a}`;
  }

  return `${day}-${month}-${year}` + time_str;
}

// export { convertDateFormat, getDate, generateId };
