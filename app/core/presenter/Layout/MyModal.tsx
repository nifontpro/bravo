import {FC} from 'react'
import Navigation from "@/core/presenter/Layout/Navigation/Navigation";
import MaterialIcon from "@/core/presenter/ui/icons/MaterialIcon";

const MyModal: FC<{ hideModal: () => void }> = ({hideModal}) => {
	return (
		<>
			<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<div
							className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
							// onClick={hideModal}
						>

							<MaterialIcon name="MdClose" classname="w-10 h-10 m-3" onClick={hideModal}/>
							<Navigation/>

						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default MyModal