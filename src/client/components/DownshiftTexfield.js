import React from 'react';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import subscribeToAutosuggestion from '../api';

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: "visible"
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
});

class DownshiftTextfield extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullstring: "",
            emit: undefined,
            suggestions: []
        }
        this.getSuggestions = this.getSuggestions.bind(this)
    }

    componentDidMount() {
        this.setState({ emit: subscribeToAutosuggestion(this.onAutosuggest) })
    }

    onAutosuggest = (results) => {
        this.setState({ suggestions: results.suggestions })
    }

    hasNumbers = (t) => {
        return /\d/.test(t);
    }

    renderSuggestion = (suggestionProps) => {
        const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
        const isHighlighted = highlightedIndex === index;
        const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

        return (
            <MenuItem
                {...itemProps}
                key={suggestion.label}
                selected={isHighlighted}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400,
                }}
            >
                {suggestion.label}
            </MenuItem>
        );
    }

    getSuggestions = (value) => {
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ?
            [] :
            this.state.suggestions
    }

    renderInput = (inputProps) => {
        const { InputProps, classes, ref, ...other } = inputProps;

        return (
            <TextField
                InputProps={{
                    inputRef: ref,
                    classes: {
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    },
                    ...InputProps,
                }}
                {...other}
            />
        );
    }

    extractMeasureObj = (string) => {
        //(\D*) -> Liter
        //(.* )
        try {
            let measureAndAmount = string.match(/(.* )/g)[0];
            let product = string.replace(measureAndAmount, "").trim();
            let amount = parseInt(measureAndAmount)
            let measure = measureAndAmount.replace(/[0-9]/g, '').trim();

            return {
                amount: amount,
                measure: measure,
                product: product
            }

        } catch {
            console.log(hasNumbers(string))
            if (!hasNumbers(string))
                return {
                    amount: 0,
                    measure: "",
                    product: string
                }
            else
                return {
                    amount: 0,
                    measure: "",
                    product: ""
                }
        }
    }

    handleChange = (e) => {
        try {
            this.state.emit(this.extractMeasureObj(e))
        } catch {
            this.state.emit({
                amount: 0,
                measure: "",
                product: e
            })
        }
        return e
        //setstate({ fullstring: e.target.value })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Downshift id="downshift-simple" onInputValueChange={this.handleChange}>
                    {({
                        getInputProps,
                        getItemProps,
                        getLabelProps,
                        getMenuProps,
                        highlightedIndex,
                        inputValue,
                        isOpen,
                        selectedItem,
                        clearSelection,
                    }) => {
                        const { onBlur, onFocus, ...inputProps } = getInputProps({
                            placeholder: 'Produkt z.B. (1L Milch)',
                            onChange: event => {
                                if (event.target.value === '') {
                                    clearSelection();
                                }
                            }
                        });

                        return (
                            <div className={classes.container}>
                                {this.renderInput({
                                    fullWidth: true,
                                    classes,
                                    InputLabelProps: getLabelProps({ shrink: true }),
                                    InputProps: { onBlur, onFocus, onFocus },
                                    inputProps,
                                    value: inputValue,
                                    onChange: this.handleChange
                                })}

                                <div {...getMenuProps()}>
                                    {isOpen ? (
                                        <Paper className={classes.paper} square>
                                            {this.getSuggestions(inputValue).map((suggestion, index) =>
                                                this.renderSuggestion({
                                                    suggestion,
                                                    index,
                                                    itemProps: getItemProps({ item: suggestion.label }),
                                                    highlightedIndex,
                                                    selectedItem,
                                                }),
                                            )}
                                        </Paper>
                                    ) : null}
                                </div>
                            </div>
                        );
                    }}
                </Downshift>
            </div>
        );
    }

}

export default withStyles(styles)(DownshiftTextfield)