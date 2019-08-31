import React from 'react'
import deburr from 'lodash/deburr'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Popper from '@material-ui/core/Popper'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { subscribeToAutosuggestion } from '../api'
import {
    extractMeasureObj, buildStringFromMeasureObj, suggestPortionMeasure,
    getPluralBasedOnAmount, capitalizeMeasure,
} from './../utility'

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'visible',
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing(2),
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing(2),
    },
    textField: {
        width: '100%',
    },
})

class ReactAutosuggestTextfield extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullstring: '',
            emit: undefined,
            suggestions: [],
            single: '',
            popper: '',
            anchorEl: undefined,
        }
        // this.getSuggestions = this.getSuggestions.bind(this)
    }

    getSuggestionValue(suggestion) {
        return suggestion.label
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({ suggestions: this.getSuggestions(value) })
        this.props.setClearValue(this.clearValue)
    };

    componentDidMount() {
        this.setState({
            emit: subscribeToAutosuggestion(this.onAutosuggest),
        })
    }

    clearValue = () => {
        this.setState({
            suggestions: [],
            popper: '',
        })
    }

    onAutosuggest = (results) => {
        this.setState({
            suggestions: results.suggestions.map((elm) => {
                const nelm = elm
                const obj = extractMeasureObj(this.state.popper)
                if (obj.amount === 0) {
                    return nelm
                }
                const suggestedMeasure = suggestPortionMeasure(obj.amount, elm.portionsizename)
                if (suggestedMeasure) {
                    nelm.label =
                        (obj.amount + ' ' + capitalizeMeasure(
                            getPluralBasedOnAmount(obj.amount, suggestedMeasure.measure)) + ' ' + elm.label).trim()
                } else {
                    nelm.label =
                        (obj.amount + ' ' + capitalizeMeasure(
                            getPluralBasedOnAmount(obj.amount, elm.portionsizename)) + ' ' + elm.label).trim()
                }
                return nelm
            }),
        })
    }

    hasNumbers = (t) => {
        return /\d/.test(t)
    }

    handleSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] })
    };

    renderSuggestion(suggestion, { query, isHighlighted }) {
        const matches = match(suggestion.label, query)
        const parts = parse(suggestion.label, matches)
        return (
            <MenuItem selected={isHighlighted} component="div" productgroupid={suggestion.productgroupid}>
                <div>
                    {parts.map((part) => (
                        <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
                            {part.text}
                        </span>
                    ))}
                </div>
            </MenuItem>
        )
    }

    getSuggestions = (value) => {
        const inputValue = deburr(value.trim()).toLowerCase()
        const inputLength = inputValue.length

        return inputLength === 0 ?
            [] :
            this.state.suggestions
    }

    renderInputComponent(inputProps) {
        const { classes, inputRef = () => { }, ref, ...other } = inputProps

        return (
            <TextField
                style={{ width: '100%' }}
                fullWidth={true}
                InputProps={{
                    inputRef: (node) => {
                        ref(node)
                        inputRef(node)
                    },
                    classes: {
                        input: classes.input,
                    },
                }}
                {...other}
            />
        )
    }

    handleChange = (name) => (event, { newValue }) => {
        const obj = {
            ...extractMeasureObj(newValue),
            productgroupid: null,
        }
        this.setState({
            popper: buildStringFromMeasureObj(obj),
        })
        if (event.type != 'keydown' && event.type != 'click') {
            this.state.emit(obj)
        }
        if (event.type === 'click') {
            obj.productgroupid = event.target.getAttribute('productgroupid')
        }
        this.props.setValue(obj)
        this.setState({
            popper: newValue,
        })
    };

    render() {
        const { classes } = this.props
        const autosuggestProps = {
            renderInputComponent: this.renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion: this.renderSuggestion,
        }

        return (
            <div className={classes.root}>
                <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                        classes,
                        id: 'react-autosuggest-popper',
                        placeholder: 'Gewünschtes Produkt (z.B. 1 Liter Milch)',
                        value: this.state.popper,
                        onChange: this.handleChange('popper'),
                        inputRef: (node) => {
                            if (this.state.anchorEl == undefined) {
                                this.setState({ anchorEl: node })
                            }
                        },
                        InputLabelProps: {
                            shrink: true,
                        },

                    }}
                    theme={{
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion,
                    }}
                    renderSuggestionsContainer={(options) => (
                        <Popper anchorEl={this.state.anchorEl} open={Boolean(options.children)}>
                            <Paper
                                square
                                {...options.containerProps}
                                style={{ width: this.state.anchorEl ? this.state.anchorEl.clientWidth : undefined }}
                            >
                                {options.children}
                            </Paper>
                        </Popper>
                    )}
                />
            </div>
        )
    }
}

export default withStyles(styles)(ReactAutosuggestTextfield)
