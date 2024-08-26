export const isEditPermissionAvailable = (authorId: number, userId: number | undefined) => {
    return authorId !== userId;
}

export const isApprovePermissionAvailable = (status: number) => {
    switch (status) {
        case 2:
            return false;
        default:
            return true;
    }
}

export const isRejectPermissionAvailable = (status: number) => {
    switch (status) {
        case 2:
            return false;
        default:
            return true;
    }
}

export const isDeletePermissionAvailable = (status: number) => {
    switch (status) {
        case 1:
        case 6:
            return true;
        default:
            return false;
    }
}
