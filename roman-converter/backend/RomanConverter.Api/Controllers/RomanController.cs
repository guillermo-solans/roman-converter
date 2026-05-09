using Microsoft.AspNetCore.Mvc;
using RomanConverter.Api.Services;

namespace RomanConverter.Api.Controllers;

[ApiController]
[Route("api/roman")]
public class RomanController : ControllerBase
{
    private readonly RomanConverterService _service;

    public RomanController(RomanConverterService service)
    {
        _service = service;
    }

    // GET /api/roman/to-roman?number=42
    [HttpGet("to-roman")]
    public IActionResult ToRoman([FromQuery] int number)
    {
        try
        {
            string roman = _service.ToRoman(number);
            return Ok(new { roman });
        }
        catch (ArgumentOutOfRangeException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    // GET /api/roman/to-integer?roman=XLII
    [HttpGet("to-integer")]
    public IActionResult ToInteger([FromQuery] string roman)
    {
        try
        {
            int integer = _service.ToInteger(roman);
            return Ok(new { integer });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}
