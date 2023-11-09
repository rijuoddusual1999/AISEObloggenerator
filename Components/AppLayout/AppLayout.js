export const AppLayout = ({children}) =>{
    return(
        <div className="grid grid-cols-2">
            <div>hello how low</div>
            <div>{children}</div>
        </div>
    )
}