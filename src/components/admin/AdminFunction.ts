import $ from "jquery";

export function handleOpenRemoveNotification(index:number) {
    $(".oval__notification")[index].setAttribute("style", "display:block");
}

export function handleCloseRemoveNotification(index:number) {
    $(".oval__notification")[index].setAttribute("style", "display:none");
}