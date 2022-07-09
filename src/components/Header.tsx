
import TodoLogo from '../assets/rocket.svg'
export function Header(){
    return(
        <div className='h-[200px] bg-gray-700 flex items-center justify-center'>
            <img className='w-[1.375rem] h-9 ' src={TodoLogo} alt="" />
            <span className=' text-blue-base font-black text-[2.5rem] ml-3'>to</span>
            <span className=' text-blue-dark font-black text-[2.5rem]'>do</span>
        </div>
    )
}