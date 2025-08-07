import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function Modal({ isOpen, setIsOpen, title, children }) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-sm sm:max-w-md transform overflow-hidden rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-base sm:text-lg font-medium leading-6 text-gray-900 mb-3 sm:mb-4">
                                    {title}
                                </Dialog.Title>
                                <div className="mt-2 sm:mt-4">
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
