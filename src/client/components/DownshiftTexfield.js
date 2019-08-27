import React from 'react';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
];

function renderInput(inputProps) {
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

    // 
    // 
}


function renderSuggestion(suggestionProps) {
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

function getSuggestions(value, { showEmpty = false } = {}) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;


    return inputLength === 0 && !showEmpty ?
        [] :
        [suggestions[1], suggestions[2], suggestions[3]]
}

const useStyles = makeStyles(theme => ({
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
}));

export default function DownshiftTextfield(props) {
    const classes = useStyles();
    const [state, setstate] = React.useState({
        fullstring: ""
    })

    const hasNumbers = (t) => {
        return /\d/.test(t);
    }

    const extractMeasureObj = (string) => {
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

    const handleChange = (e) => {
        try {
            console.log(extractMeasureObj(e))
        } catch { }

        //setstate({ fullstring: e.target.value })
    }

    return (
        <div className={classes.root}>
            <Downshift id="downshift-simple" onInputValueChange={handleChange}>
                {({
                    getInputProps,
                    getItemProps,
                    getLabelProps,
                    getMenuProps,
                    highlightedIndex,
                    inputValue,
                    isOpen,
                    selectedItem,
                }) => {
                    const { onBlur, onFocus, ...inputProps } = getInputProps({
                        placeholder: 'Produkt z.B. (1L Milch)',
                    });


                    return (
                        <div className={classes.container}>
                            {renderInput({
                                fullWidth: true,
                                classes,
                                InputLabelProps: getLabelProps({ shrink: true }),
                                InputProps: { onBlur, onFocus },
                                inputProps,
                                value: inputValue,
                                onChange: handleChange
                            })}

                            <div {...getMenuProps()}>
                                {isOpen ? (
                                    <Paper className={classes.paper} square>
                                        {getSuggestions(inputValue).map((suggestion, index) =>
                                            renderSuggestion({
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
