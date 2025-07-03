export default (err,req,res,next) => {    
    console.error(err);
    if (err.name==='CastError')
        return res.status(400).json({ error:'Invalid ID' });
    res.status(err.status||500).json({ error: err.message });
};