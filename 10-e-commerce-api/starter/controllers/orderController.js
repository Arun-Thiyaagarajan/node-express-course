

const getAllOrders = async (req, res) => {
    res.send('getAllOrders');
}

const getSingleOrder = async (req, res) => {
    res.send('getSingleOrder');
}

const getCurrentUserOrder = async (req, res) => {
    res.send('getCurrentUserOrder');
}

const createOrder = async (req, res) => {
    res.send('createOrder');
}

const updateOrder = async (req, res) => {
    res.send('updateOrder');
}

export { 
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrder,
    createOrder,
    updateOrder,
};