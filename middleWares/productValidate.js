export const valideProduct = (req) => {
    if (req.body.title !== '' && req.body.body !== '') {
        return true;
    }
    else {
        return false;
    }
}

export const valideProductUpdate = (req) => {
    if (req.body.title !== '' && req.body.body !== '' && req.body.id !== '') {
        return true;
    }
    else {
        return false;
    }
}