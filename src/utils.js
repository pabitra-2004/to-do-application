// ! todo array item id 
export function generateId() {
    return (Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 8));
}


export function convertDateFormat(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
    // return `${day}-${month}-${year}T${hours}:${minutes}`;
}

export function getDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    // return `${year}-${month}-${day}`;
    return `${day}-${month}-${year}`;
}

// export export ;