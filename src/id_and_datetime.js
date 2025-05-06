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
export function showFormatDate(due_date) {   
    const date = new Date(due_date);
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 

    return `${day}-${month}-${year}, ${hours}:${minutes} ${ampm}`;
}


