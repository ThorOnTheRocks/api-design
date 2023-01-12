import prisma from "../db";

// Get all updates
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    },
    include: {
      updates: true
    }
  })

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates]
  }, [])

  res.json({ data: updates})
}

// Get one update
export const getOneUpdate = async (req, res) => {
  const id = req.params.id;

  const update = await prisma.update.findUnique({
    where: {
      id,
    }
  })

  res.json({data: update})
}

// Create one update
export const createUpdate = async (req, res) => {
  const {productId, ...rest} = req.body;
  const product = await prisma.product.findUnique({
    where: {
      id: productId
    }
  })

  if (!product) {
    // does not belong to user
    res.json({message: 'not for you'})
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: {
        connect: {
          id: product.id
        }
      }
    }
  })

  res.json({data: update})
}

// Update one update
export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    }
  })

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates]
  }, [])

  const match = updates.find(update => update.id === req.params.id);

  if(!match) {
    //handle this
    return res.json({message: 'not for you'})
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id
    },
    data: req.body
  })
  res.json({data: updatedUpdate})
}

// Delete one update
export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    }
  })

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates]
  }, [])

  const match = updates.find(update => update.id === req.params.id);

  if(!match) {
    //handle this
    return res.json({message: 'not for you'})
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id
    }
  })

  res.json({data: deleted})
}