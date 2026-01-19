import Content from "../Content/page"

function Overlay({ onClose }){
    return(
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
            <Content onClose={onClose} />
        </div>
    )
}
export default Overlay