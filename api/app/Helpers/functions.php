<?php

if(!function_exists("field_replace")){

    function field_replace($item, $old_field, $new_field){

        $item[$new_field] = $item[$old_field];
        unset($item[$old_field]);
        return $item;
    }
}

if(!function_exists("field_replace_created_at")){

    function field_replace_created_at($item, $new_field){

        $item[$new_field] = date("Y-m-d H:i:s", strtotime($item['created_at']));
        unset($item['created_at']);
        return $item;
    }
}

