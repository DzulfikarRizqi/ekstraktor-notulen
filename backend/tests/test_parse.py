import pytest

from app.llm.parsing import parse_json


def test_parse_plain_object():
    assert parse_json('{"a":1}') == {"a": 1}


def test_parse_fenced_json():
    assert parse_json('```json\n{"a":1}\n```') == {"a": 1}


def test_parse_ignores_text_before_json():
    assert parse_json('berikut hasilnya: {"a":1}') == {"a": 1}


def test_parse_raises_when_not_json():
    with pytest.raises(ValueError):
        parse_json("tidak ada json")


def test_parse_array_via_min_index():
    assert parse_json('teks: [1, 2]') == [1, 2]