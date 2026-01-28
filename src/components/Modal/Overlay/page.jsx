import Content from "../Content/page"
import clsx from "clsx"

function Overlay({ open, onClose }){
    return(
        <div className={clsx(
        "fixed inset-0 z-700 flex items-center justify-center bg-black/40",
        "transition-opacity duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
            <Content onClose={onClose} />
        </div>
    )
}
export default Overlay