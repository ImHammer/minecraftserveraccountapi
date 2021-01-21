
import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'

export default function Input({ name, ...rest })
{
	const ref = useRef()
	const { fieldName, registerField, defaultValue, error } = useField(name)

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: ref.current,
			path: 'value'
		})
	}, [fieldName, registerField])

	return (
		<input ref={ref} {...rest} />
	)
}