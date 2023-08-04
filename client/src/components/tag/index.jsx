import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag} from '@fortawesome/free-solid-svg-icons'

export const TagLabel = ({name, keys, handleChange}) => {
    return (
        <div className='inline-block'>
            <input type="checkbox" id={keys} className='peer hidden' onChange={e => handleChange(name, e.target.checked)}/>
            <label htmlFor={keys} className="bg-gray-500 text-white rounded-2xl w-auto h-5 text-[12px] px-2 mt-2 mx-[1px] transition-colors peer-checked:bg-yellow-300">
                <FontAwesomeIcon icon={faTag} className='mr-[2px]' fontSize={12}/>
                {name}
            </label>
        </div>
        
    )
}

export const ShowTag = (props) => {
    return (
        <div className='inline-block'>
            <input type="checkbox" className='peer hidden' />
            <label className="bg-gray-500 text-white rounded-2xl w-auto h-5 text-[12px] px-2 mt-2 mx-[1px]">
                <FontAwesomeIcon icon={faTag} className='mr-[2px]' fontSize={12}/>
                {props.name}
            </label>
        </div>
    )
}

// export default TagLabel;