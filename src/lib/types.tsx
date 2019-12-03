import {Component} from './react'
export interface ReactElement {
    type: any | FunctionComponent| Component,
    props: any
}

export interface FunctionComponent {}