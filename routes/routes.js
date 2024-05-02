const express = require('express');
const router = express.Router()
module.exports = router;
const modeloTarefa = require('../models/tarefa');

router.post('/post', async (req, res) => {
    const objetoTarefa = new modeloTarefa({
        descricao: req.body.descricao,
        statusRealizada: req.body.statusRealizada
    })
    try {
    const tarefaSalva = await objetoTarefa.save();
    res.status(200).json(tarefaSalva)
    }
    catch (error) {
    res.status(400).json({ message: error.message })
    }
})

router.get('/getAll', async(req, res) => {
    try {
        const tarefas = await modeloTarefa.find(); 
        res.status(200).json(tarefas); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
})

router.patch('/update/:id', async (req, res) => {
    const id = req.params.id;

    try {
        
        const tarefaAtualizada = await modeloTarefa.findByIdAndUpdate(id, req.body, { new: true });
        if (!tarefaAtualizada) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        res.status(200).json(tarefaAtualizada); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const tarefaExcluida = await modeloTarefa.findByIdAndDelete(id); 
        if (!tarefaExcluida) {
            return res.status(404).json({ message: 'Tarefa nao existe' }); 
        }
        res.status(200).json({ message: 'Tarefa excluída com sucesso' }); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});
   